import Image from "next/image";

const notFoundPage = () => {
  return (
    <div className="pt-5">
      <div className="flex justify-center">
        <Image
          className="object-cover"
          src="/../public/static/pepe-hands.png"
          alt={"404 image"}
          width={200}
          height={200}
          priority
        />
      </div>
      <div className="text-center w-full text-gray-100 py-3 text-3xl">
        404 | Page not found.
      </div>
    </div>
  );
};

export default notFoundPage;
