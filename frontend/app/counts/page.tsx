'use client'
import { decrement, increment, reset } from "@/app/redux/features/counterSlice";
import { useAppDispatch, useAppSelector} from "@/app/redux/hooks";

export default function countTestPage() {
  const count = useAppSelector((state) => state.counterReducer.value)
  const dispatch = useAppDispatch()
  return (
    <>
      <div>
        <h2>{count}</h2>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <button onClick={() => dispatch(increment())}>
            ++
          </button>
          <button onClick={() => dispatch(decrement())}>
            --
          </button>
          <button onClick={() => dispatch(reset())}>
            reset
          </button>
        </div>

      </div>
    </>
  )
}