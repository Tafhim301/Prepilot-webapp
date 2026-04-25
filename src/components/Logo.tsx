import img from "@/assets/img/logo.png"
import Image from "next/image"

export default function Logo() {
  return (
    <div>
      <Image src={img} alt="Logo" width={120} height={100} />
    </div>
  )
}
