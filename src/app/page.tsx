import Button from '@/components/Button'

export default function Home() {
  return (
    <div className='flex justify-center items-center p-8'>
      <Button href='/weather'>Check weather</Button>
    </div>
  )
}
