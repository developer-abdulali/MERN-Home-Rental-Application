import { assets } from "../../../public/assets/assets";

const Footer = () => {
  return (
    <footer className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left section */}
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-40" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Prescripto helps you find trusted doctors, book appointments
            online in seconds, and manage your healthcare visits all in one
            place.
          </p>
        </div>

        {/* center section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About us</li>
            <li className="cursor-pointer">Contact us</li>
            <li className="cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* right section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer">+1 (555) 000-0000</li>
            <li className="cursor-pointer">support@prescripto.com</li>
          </ul>
        </div>
      </div>
      {/* copyright section */}
      <div>
        <hr />
        <p className="text-center text-gray-600 text-sm py-5">
          &copy; {new Date().getFullYear()} Prescripto. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
