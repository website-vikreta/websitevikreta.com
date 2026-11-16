import type { ReactNode } from 'react'
import { ChatHeader, FillChat, MessageBar, PHONE_HEADER_H, PHONE_INPUT_H, PHONE_RIM, PHONE_STATUS_H, PhoneFrame, PhoneStatusBar } from './WhatsAppPhoneShell'

/* The page's iPhone (see WhatsAppPhoneShell), filling a parent the caller sizes and positions.
   Chrome sizes are exported so boards that overlay messages at exact coordinates know where
   the chat area starts and ends. */
export const IPHONE_RIM = PHONE_RIM
export const IPHONE_TOP = PHONE_STATUS_H + PHONE_HEADER_H
export const IPHONE_BOTTOM = PHONE_INPUT_H

export default function IPhone({ time, name, avatarLetter, children }: { time: string; name: string; avatarLetter: string; children?: ReactNode }) {
  return (
    <PhoneFrame fill>
      <PhoneStatusBar time={time} />
      <ChatHeader name={name} avatarLetter={avatarLetter} />
      <FillChat>{children}</FillChat>
      <MessageBar />
    </PhoneFrame>
  )
}
