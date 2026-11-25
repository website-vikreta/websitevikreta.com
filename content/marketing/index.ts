export * from './types'
export { PILLAR, SERVICES, getService, getSubService, serviceParams, subParams } from './services'

export const BASE = '/services/digital-marketing'
export const SITE = 'https://www.websitevikreta.com'
export const WA_NUMBER = '919970445198'

export const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
