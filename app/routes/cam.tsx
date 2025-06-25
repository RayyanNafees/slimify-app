import { redirect } from "react-router"

export const loader = async () => {
  return redirect(`/logout`)
}
function Cam() {
  return (
    <>
      <h1>index page</h1>
    </>
  )
}

export default Cam