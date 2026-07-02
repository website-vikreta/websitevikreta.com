import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/write-client'

const EMAILJS_SERVICE_ID   = process.env.NEXT_PUBLIC_EMAILJS_CAREERS_SERVICE_ID    ?? ''
const EMAILJS_TEMPLATE_ID  = process.env.NEXT_PUBLIC_EMAILJS_CAREERS_TEMPLATE_ID   ?? ''
const EMAILJS_PUBLIC_KEY   = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY            ?? ''
const EMAILJS_PRIVATE_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PRIVATE_KEY           ?? ''

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name         = formData.get('name')         as string
    const email        = formData.get('email')        as string
    const phone        = formData.get('phone')        as string | null
    const openingId    = formData.get('openingId')    as string
    const openingTitle = formData.get('openingTitle') as string
    const openingSlug  = formData.get('openingSlug')  as string
    const file         = formData.get('resume')       as File | null

    if (!name || !email || !openingId || !file) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are accepted.' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const asset = await writeClient.assets.upload('file', buffer, {
      filename: file.name,
      contentType: 'application/pdf',
    })

    const resumePublicUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'}/${asset.assetId}.pdf`

    await writeClient.create({
      _type: 'submission',
      candidateName: name,
      email,
      phone: phone ?? '',
      opening: {
        _type: 'reference',
        _ref: openingId,
      },
      resume: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
      resumePublicUrl,
      submittedAt: new Date().toISOString(),
      status: 'new',
    })

    const jobUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}/careers/${openingSlug}`

    const emailPayload = {
      service_id:   EMAILJS_SERVICE_ID,
      template_id:  EMAILJS_TEMPLATE_ID,
      user_id:      EMAILJS_PUBLIC_KEY,
      accessToken:  EMAILJS_PRIVATE_KEY,
      template_params: {
        candidate_name:  name,
        candidate_email: email,
        candidate_phone: phone ?? 'Not provided',
        job_title:       openingTitle,
        job_url:         jobUrl,
        resume_url:      resumePublicUrl,
      },
    }

    const emailRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload),
    })

    if (!emailRes.ok) {
      console.error('[EmailJS] careers email failed:', await emailRes.text())
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('[careers/apply] error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
