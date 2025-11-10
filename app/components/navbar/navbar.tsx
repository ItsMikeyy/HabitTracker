import Link from "next/link";

export default function NavBar() {
  return (
      <div className="border-b-2 border-b-gray-400 ">
        <div className="m-10 flex justify-between">
            <div className="flex gap-8">
                <h1 className="text-3xl font-bold">HABITS</h1>
                <div className="flex gap-6">
                    <h1 className="m-auto text-lg text-gray-300">Home</h1>
                    <h1 className="m-auto text-lg text-gray-300">About</h1>
                    <h1 className="m-auto text-lg text-gray-300">Product</h1>
                    <h1 className="m-auto text-lg text-gray-300">Contact</h1>
                </div>
            </div>
            <div className="flex gap-4">
                <button className="cursor-pointer text-xl bg-white px-5 bg-gradient-to-r from-[rgba(155,42,74,1)] via-[rgba(162,87,199,1)] to-[rgba(83,206,237,1)] rounded-xl">Log in</button>
                <Link href="/signup">
                    <button className="cursor-pointer text-xl border-white border-2 px-4 rounded-xl b-lin">Sign up</button>
                </Link>
            </div>
        </div>
      </div>
  );
}
