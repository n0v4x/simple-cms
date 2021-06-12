import { ReactNode } from "react"

interface SectionProps {
  children?: ReactNode
}

const Section = ({ children }: SectionProps) => {
  return <section className="section">
    {children}
  </section>
}

export default Section;