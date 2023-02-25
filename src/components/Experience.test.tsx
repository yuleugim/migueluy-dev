import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import Experience from './Experience'

test('Displays title based on props', () => {
  const title = faker.name.jobTitle()
  const { getByRole } = render(<Experience title={title} />)

  expect(getByRole('heading', { name: title })).toHaveTextContent(title)
})

test('Displays company based on props', () => {
  const company = faker.company.name()
  const { getByText } = render(<Experience company={company} />)

  expect(getByText(company)).toBeInTheDocument()
})

test('Displays dates based on props', () => {
  const dateFrom = faker.datatype.datetime()
  const dateTo = faker.datatype.datetime({ min: dateFrom.getTime() })
  const dateFromText = dateFrom.toLocaleDateString('en-us', {
    month: 'short',
    year: 'numeric',
  })
  const dateToText = dateTo.toLocaleDateString('en-us', {
    month: 'short',
    year: 'numeric',
  })

  const { getByText } = render(
    <>
      <Experience dateFrom={dateFromText} dateTo={dateToText} />
      <Experience dateFrom={dateFromText} current={true} />
    </>
  )

  expect(getByText(`${dateFromText} - ${dateToText}`)).toBeInTheDocument()
  expect(getByText(/ \- current/i)).toHaveTextContent(dateFromText)
})

test('Displays content based on props', () => {
  const lines = faker.lorem.lines()
  const content = `<ul>
    ${lines
      .split('\n')
      .map(line => `<li>${line}</li>`)
      .join()}
  </ul>`
  const { getByRole } = render(<Experience content={content} />)

  expect(getByRole('list')).toBeInTheDocument()
})
