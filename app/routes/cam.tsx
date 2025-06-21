import Camera from '@/components/camera'

export const loader = () => {

  console.log("Connecting to MongoDB...");
  import('mongoose').then(mongoose =>
    mongoose.connect(process.env.MONGO_URI as string)
      .then(() => console.log("MongoDB connected"))
      .catch((e) => {
        console.log("MongoDB connection error:", e);
        throw e;
      }));

}
function Cam() {
  return (
    <Camera />
  )
}

export default Cam