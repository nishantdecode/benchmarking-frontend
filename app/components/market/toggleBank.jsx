import { Button } from "@/components/ui/button"

export function ToggleBank({data, bank, setBank}) {
  return (
    <div className="flex flex-col justify-start items-start w-full gap-1">
      {data.map((item, index)=>{
        return (
          <Button key={index} variant={`${item.name === bank ? 'toggleActive' : 'toggle'}`} className="flex flex-row text-xs w-full gap-2" onClick={()=>setBank(item.name)}>
            {item.iconUrl}
            {item.name}
          </Button>
        )
      })}
    </div>
  )
}
