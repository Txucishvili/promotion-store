export async function sleep(ms: number) {
  return new Promise((r: any) => {
    setTimeout(() => {
      r();
    }, ms);
  })
}

export function countDownDistance(end) {
  const start = new Date();
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = end.getTime() - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    days, hours, minutes, seconds
  }
}