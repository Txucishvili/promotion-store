'use client'
import { countDownDistance } from '@/utils';
import React, { useEffect, useState } from 'react'

export default function CountDown({ endDate }: { endDate: Date | string }) {
  // Set the date we're counting down to
  const date = typeof endDate == 'string' ? new Date(endDate) : endDate;
  var countDownDate = date.getTime();

  const [dateState, setDate] = useState({
    ...countDownDistance(endDate),
    seconds: 0
  });

  // Update the count down every 1 second
  useEffect(() => {
    var x = setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime();
  
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
  
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      // Display the result in the element with id="demo"
      // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      //   + minutes + "m " + seconds + "s ";
  
      setDate({
        days,hours,minutes,seconds
      })
  
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        // document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
  }, [])

  return (
    <div className="grid grid-flow-col justify-center mb-4 gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-gray-200 text-gray-600 rounded-box">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": dateState.days }}></span>
        </span>
        დღე
      </div>
      <div className="flex flex-col p-2 bg-gray-200 text-gray-600 rounded-box">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": dateState.hours }}></span>
        </span>
        საათი
      </div>
      <div className="flex flex-col p-2 bg-gray-200 text-gray-600 rounded-box">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": dateState.minutes }}></span>
        </span>
        წუთი
      </div>
      <div className="flex flex-col p-2 bg-gray-200 text-gray-600 rounded-box">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": dateState.seconds }}></span>
        </span>
        წამი
      </div>
    </div>
  )
}
