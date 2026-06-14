import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { cn } from '@/lib/utils';

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos: Logo[];
  duration?: number;
  durationOnHover?: number;
  gap?: number;
  reverse?: boolean;
};

export function LogoCloud({
  className,
  logos,
  duration = 25,
  durationOnHover,
  gap = 42,
  reverse = false,
  ...props
}: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        'overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]',
        className
      )}
    >
      <InfiniteSlider gap={gap} duration={duration} durationOnHover={durationOnHover} reverse={reverse}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className='pointer-events-none h-6 w-auto select-none md:h-8 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale'
            key={`logo-${logo.alt}`}
            loading='lazy'
            src={logo.src}
            width={logo.width}
            height={logo.height}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
