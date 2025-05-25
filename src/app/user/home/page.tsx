import Image from "next/image";
import logo1 from "../../../../public/img1.jpg"
import Link from "next/link";
export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-white text-gray-800">
    

     
      <section className="bg-blue-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Welcome to <span className="text-green-500">Heal</span><span className="text-blue-500">Hub</span></h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Choose if you are:</p>
        <div className="flex justify-center gap-6">
       
          <Link href="/user/home/healthPage">
          <button className="bg-emerald-400 cursor-pointer hover:bg-black text-white font-semibold py-3 px-10 rounded-full transition  ">
            Health Page 
          </button>
          </Link>
          <Link href="/user/home/socialPage">
          <button className="cursor-pointer bg-blue-600 hover:bg-black text-white font-semibold py-3 px-10 rounded-full transition">
              Social Page 
          </button>
          </Link>
        </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row  items-center gap-10">
          <div className="md:w-1/4">
            <Image src={logo1} alt="About"  height={400} className="rounded-lg w-full shadow" />
          </div>
          <div className="md:w-full ">
            <h3 className="text-3xl font-bold mb-4">Welcome to HealHub</h3>
            <p className="text-gray-600 mb-4">
            HealHub  is a unified platform designed to support individuals in need of medical care or social assistance.
We believe that everyone deserves quick and easy access to essential services — whether you&#39;re dealing with a health concern or facing social challenges. Our mission is to simplify the process of getting help by connecting users with the right resources through a single, easy-to-use application.

           </p>
            <p className="text-gray-600">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </p>
          </div>
        </div>
      </section >

      {/* Services Section */}
      <section className="bg-gray-100 py-20 ">
  <div className="container mx-auto px-4 text-center ">
    <h3 className="text-3xl font-bold mb-10">Our Services</h3>
    <div className="grid md:grid-cols-2 gap-8 ">
      
      {/* Health Care Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-blue-600 text-4xl mb-4">❤️</div>
        <h4 className="text-xl font-semibold mb-2">Health Care</h4>
        <p className="text-gray-600">
          At Healhub, we are committed to making essential healthcare and social assistance services accessible to everyone.
        </p>
      </div>

      {/* Dental Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-blue-600 text-4xl mb-4">💡</div>
        <h4 className="text-xl font-semibold mb-2">Social Care</h4>
        <p className="text-gray-600">
        Support for those facing financial, emotional, or housing difficulties. Whether you need food assistance, family aid, or mental health resources — we’re here to help.
        </p>
      </div>

   

    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-100  mt-10 p-8 text-black">
       <div>
       <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose  what do you want :</h2>     
       <div className="flex justify-center gap-6 ">
       <Link href="/user/home/healthPage">
          <button className="bg-emerald-400 cursor-pointer hover:bg-black text-white font-semibold py-3 px-10 rounded-full transition  ">
            Health Page
          </button>
          </Link>
        <Link href="/user/home/socialPage">
          <button className="bg-blue-600 cursor-pointer hover:bg-black text-white font-semibold py-3 px-10  rounded-full transition">  
            Socilal Page 
          </button>
          </Link>
          
        </div>
         </div>
      </footer>
    </main>
  );
}

