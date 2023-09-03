import Image from 'next/image'
export const dynamicParams = true // true | false,
import { AccordionList, Accordion, AccordionHeader, AccordionBody } from "@tremor/react";


export default function Home() {

  // console.log('Procces', process.env)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AccordionList className="max-w-md mx-auto">
        <Accordion>
          <AccordionHeader>Accordion 1</AccordionHeader>
          <AccordionBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est
            congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.
          </AccordionBody>
        </Accordion>
        <Accordion>
          <AccordionHeader>Accordion 2</AccordionHeader>
          <AccordionBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est
            congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.
          </AccordionBody>
        </Accordion>
        <Accordion>
          <AccordionHeader>Accordion 3</AccordionHeader>
          <AccordionBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est
            congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.
          </AccordionBody>
        </Accordion>
      </AccordionList>

    </main>
  )
}
