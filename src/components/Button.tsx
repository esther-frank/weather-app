import Link from "next/link"
import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
  href
}) => {
  const baseStyles = 'border-solid rounded-md bg-blue-900 p-4 text-center text-white'

  if(href) {
    return (
        <Link href={href} className={`${baseStyles} ${className}`}>{children}</Link>
    )
  }
  return (
    <button className={`${baseStyles} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
