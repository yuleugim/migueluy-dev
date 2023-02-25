import * as React from 'react'

const Experience = ({
  title,
  company,
  current,
  dateFrom,
  dateTo,
  content,
}: ExperienceProps) => {
  return (
    <section>
      <h3 className="font-display">{title}</h3>
      <p className="font-display">
        <strong>{company}</strong>{' '}
        <em>
          {dateFrom} - {current ? 'Current' : dateTo}
        </em>
      </p>
      <div dangerouslySetInnerHTML={{ __html: content || '' }} />
    </section>
  )
}

export interface ExperienceProps {
  title?: string | null
  company?: string | null
  current?: boolean | null
  dateFrom?: string | null
  dateTo?: string | null
  content?: string | null
}

export default Experience
