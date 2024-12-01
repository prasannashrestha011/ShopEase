"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface CarouselProp{
    images:string[]
}
export function ProductCarousel({images}:CarouselProp) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-96 "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
      
         {images.map((image,idx)=>(
             <CarouselItem key={idx}>
             <div className="p-1">
               <Card>
                 <CardContent className="flex aspect-square items-center justify-center p-6">
                   <span className="text-4xl font-semibold">
                    <img src={image} className="w-full"/>
                   </span>
                 </CardContent>
               </Card>
             </div>
           </CarouselItem>
         ))}
       
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
