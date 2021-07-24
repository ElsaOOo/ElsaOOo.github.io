import { ref, onMounted, onUnmounted } from 'vue'
const dayList = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六😺', '星期天😁'];
/** 输出当前时间 */
export const useCurrentTime = () => {
  let timer: number;
  const datetime = ref('');
  
  const getCurrentTime = () => {
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1;
    const day = new Date().getDate();
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes();
    const weekDay  = new Date().getDay();
    datetime.value = `${year}/${month}/${day} ${dayList[weekDay - 1]}  ${hour}:${minutes}`
  }

  onMounted(() => {
    getCurrentTime();
     timer = setInterval(() => {       
       getCurrentTime();
     }, 60 * 1000)
  })
  onUnmounted(() => {
    clearInterval(timer)
  })

  return {
    datetime
  }
}