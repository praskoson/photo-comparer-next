import { StaticImageData } from 'next/image'
import p_1_photo from '../../public/assets/photos/1/p_source.png'
import v_1_photo from '../../public/assets/photos/1/v_source.jpg'
import p_2_photo from '../../public/assets/photos/2/p_cropped.png'
import p_2_source from '../../public/assets/photos/2/p_source.png'
import v_2_photo from '../../public/assets/photos/2/v_source.jpg'
import p_3_photo from '../../public/assets/photos/3/p_source.png'
import v_3_photo from '../../public/assets/photos/3/v_source.jpg'
import p_4_photo from '../../public/assets/photos/4/p_source.png'
import v_4_photo from '../../public/assets/photos/4/v_source.jpg'
import p_5_photo from '../../public/assets/photos/5/p_source.png'
import v_5_photo from '../../public/assets/photos/5/v_source.jpg'
import p_6_photo from '../../public/assets/photos/6/p_source.png'
import v_6_photo from '../../public/assets/photos/6/v_source.jpg'
import p_7_photo from '../../public/assets/photos/7/p_source.png'
import v_7_photo from '../../public/assets/photos/7/v_source.jpg'
import v_7_cropped from '../../public/assets/photos/7/v_cropped.jpg'
import p_8_photo from '../../public/assets/photos/8/p_source.png'
import v_8_photo from '../../public/assets/photos/8/v_source.jpg'
import p_9_photo from '../../public/assets/photos/9/p_source.png'
import v_9_photo from '../../public/assets/photos/9/v_source.jpg'
import p_9_cropped from '../../public/assets/photos/9/p_cropped.png'
import v_9_cropped from '../../public/assets/photos/9/v_cropped.jpg'
import p_10_photo from '../../public/assets/photos/10/p_source.png'
import v_10_photo from '../../public/assets/photos/10/v_source.jpg'

export function getSourcePhotos(index: number): {
  pCropped?: StaticImageData
  vCropped?: StaticImageData
  pSource: StaticImageData
  vSource: StaticImageData
} {
  switch (index) {
    case 1:
      return {
        pSource: p_1_photo,
        vSource: v_1_photo,
      }
    case 2:
      return {
        pCropped: p_2_photo,
        pSource: p_2_source,
        vSource: p_2_source,
      }
    case 3:
      return {
        pSource: p_3_photo,
        vSource: v_4_photo,
      }
    case 4:
      return {
        pSource: p_4_photo,
        vSource: v_4_photo,
      }
    case 5:
      return {
        pSource: p_5_photo,
        vSource: v_5_photo,
      }
    case 6:
      return {
        pSource: p_6_photo,
        vSource: v_6_photo,
      }
    case 7:
      return {
        vCropped: v_7_cropped,
        pSource: p_7_photo,
        vSource: v_7_photo,
      }
    case 8:
      return {
        pSource: p_8_photo,
        vSource: v_8_photo,
      }
    case 9:
      return {
        pCropped: p_9_cropped,
        vCropped: v_9_cropped,
        pSource: p_9_photo,
        vSource: v_9_photo,
      }
    case 10:
      return {
        pSource: p_10_photo,
        vSource: v_10_photo,
      }
    default:
      throw new Error(`Invalid index: ${index}`)
  }
}
