'use client'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'
const FS = `precision highp float;
uniform vec2 r;uniform float t;uniform vec2 m;
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
vec3 obj(vec3 p){p.xz*=rot(t*0.6+m.x*1.4);p.yz*=rot(0.35+m.y*1.1);return p;}
float map(vec3 p){
  p=obj(p);
  float pulse=1.+0.35*pow(0.5+0.5*sin(t*2.2),6.);
  return length(p)-1.0+0.09*pulse*sin(2.6*p.x+1.6*t)*sin(2.9*p.y+1.2*t)*sin(2.4*p.z+1.9*t)+0.04*sin(5.*p.x-1.5*t)*sin(5.3*p.z+0.9*t);
}
vec3 nrm(vec3 p){vec2 e=vec2(0.002,0.);return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}
float h1(float x){return fract(sin(x*127.1)*43758.5453);}
// thin crackling arcs that crawl over the surface (object space, so they spin with it)
float arcs(vec3 q){
  float f1=sin(q.x*6.+sin(q.y*4.3+t*3.1)*1.7+sin(q.z*5.1-t*2.3)+t*2.4);
  float f2=sin(q.z*7.3+sin(q.x*5.2-t*2.7)*1.5+sin(q.y*3.7+t*1.9)-t*1.8);
  float l=0.018/(abs(f1)+0.02)+0.014/(abs(f2)+0.02);
  float flick=0.65+0.35*step(0.55,h1(floor(t*14.)));
  return min(l*flick,3.);
}
void main(){
  vec2 uv=(gl_FragCoord.xy*2.-r)/min(r.x,r.y)*0.98;
  vec3 ro=vec3(0.,0.,3.2),rd=normalize(vec3(uv,-1.8));
  float d=0.,md=1e3;bool hit=false;
  for(int i=0;i<72;i++){
    float h=map(ro+rd*d);md=min(md,h);
    if(h<0.001){hit=true;break;}
    d+=h*0.8;if(d>8.)break;
  }
  vec3 cyan=vec3(0.1,0.85,1.),vio=vec3(0.55,0.2,1.),mag=vec3(1.,0.2,0.75),yel=vec3(0.98,0.78,0.);
  if(!hit){
    // electric halo: cyan/violet glow that breathes, with stray sparks
    float ang=atan(uv.y,uv.x);
    float g=exp(-md*14.)*(0.7+0.2*sin(ang*5.+t*6.)+0.1*sin(t*9.));
    float spark=pow(max(sin(ang*9.-t*8.)*sin(ang*5.+t*5.3),0.),18.)*exp(-md*22.);
    vec3 c=mix(vec3(0.75,0.95,1.),cyan,0.45)*g+vec3(1.,0.95,0.7)*spark;
    float a=clamp(g*0.85+spark,0.,1.);
    gl_FragColor=vec4(c*a,a);return;
  }
  vec3 p=ro+rd*d,n=nrm(p),v=-rd,q=obj(p);
  vec3 L=normalize(vec3(-0.5,0.8,0.7));
  float fres=pow(1.-max(dot(n,v),0.),2.);
  float hue=dot(n,vec3(0.3,0.6,0.2))*1.6+fres*1.4+t*0.15;
  float w=0.5+0.5*cos(6.2832*hue);
  vec3 irid=mix(mix(vio,cyan,w),mag,pow(0.5+0.5*sin(6.2832*hue*0.5+1.),3.)*0.6);
  float dif=max(dot(n,L),0.);
  vec3 col=mix(vec3(0.05,0.03,0.2),irid,0.85);
  col=mix(col,cyan,smoothstep(0.3,1.,dif)*0.35);
  col=mix(col,vio,fres*0.6);
  col=mix(col,mag,smoothstep(0.6,1.,fres)*0.45);
  col*=0.45+0.75*dif;
  vec3 hv=normalize(L+v);
  col+=vec3(1.)*pow(max(dot(n,hv),0.),80.)*1.1;
  col+=cyan*fres*0.9;
  float e=arcs(q);
  col+=mix(vec3(0.7,0.97,1.),yel,0.35+0.35*sin(q.y*3.+t*2.))*e*1.1;
  col+=vec3(1.)*smoothstep(1.5,3.,e)*0.6;
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}`

/** Raw WebGL1 iridescent blob. Transparent canvas; falls back to a CSS sphere. */
export function AiBubble({ className = '', host }: { className?: string; host?: React.RefObject<HTMLElement | null> }) {
  const cv = useRef<HTMLCanvasElement>(null)
  const reduce = !!useReducedMotion()
  const [ok, setOk] = useState(true)
  useEffect(() => {
    const c = cv.current
    if (!c) return
    const gl = c.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!gl) { setOk(false); return } // no WebGL: swap to CSS sphere
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src); gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error('AiBubble shader:', gl.getShaderInfoLog(s))
      return s
    }
    const pr = gl.createProgram()!
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS))
    gl.linkProgram(pr)
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { console.error('AiBubble link:', gl.getProgramInfoLog(pr)); setOk(false); return }
    gl.useProgram(pr)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, 'a')
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const uR = gl.getUniformLocation(pr, 'r'), uT = gl.getUniformLocation(pr, 't'), uM = gl.getUniformLocation(pr, 'm')
    gl.clearColor(0, 0, 0, 0)

    const m = { x: 0, y: 0, tx: 0, ty: 0 }
    const draw = (ms: number) => {
      m.x += (m.tx - m.x) * 0.08; m.y += (m.ty - m.y) * 0.08
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uR, c.width, c.height); gl.uniform1f(uT, ms / 1000); gl.uniform2f(uM, m.x, m.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.round(c.clientWidth * dpr)), h = Math.max(1, Math.round(c.clientHeight * dpr))
      if (c.width !== w || c.height !== h) { c.width = w; c.height = h; gl.viewport(0, 0, w, h) }
    }
    let raf = 0, vis = true
    const t0 = performance.now()
    const frame = (n: number) => { size(); draw(n - t0 + 4000); raf = vis && !document.hidden ? requestAnimationFrame(frame) : 0 }
    const kick = () => { if (!raf && !reduce && vis && !document.hidden) raf = requestAnimationFrame(frame) }
    const ro = new ResizeObserver(() => { size(); if (reduce) draw(4000) })
    ro.observe(c)
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; kick() })
    io.observe(c)
    document.addEventListener('visibilitychange', kick)
    const tile = host?.current ?? c.parentElement
    const mv = (e: PointerEvent) => {
      const b = tile!.getBoundingClientRect()
      m.tx = (e.clientX - b.left) / b.width - 0.5; m.ty = (e.clientY - b.top) / b.height - 0.5
    }
    const lv = () => { m.tx = 0; m.ty = 0 }
    tile?.addEventListener('pointermove', mv as EventListener); tile?.addEventListener('pointerleave', lv)
    size(); draw(4000)
    if (!reduce) raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      document.removeEventListener('visibilitychange', kick)
      tile?.removeEventListener('pointermove', mv as EventListener); tile?.removeEventListener('pointerleave', lv)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [reduce, host])
  return ok
    ? <canvas ref={cv} className={className} aria-hidden />
    : <div className={`${className} bn-blob-fb`} aria-hidden />
}
