import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../../public/assets/assets";
import RelatedDoctors from "../../components/RelatedDoctors/RelatedDoctors";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const Appointment = () => {
  const navigate = useNavigate();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const { docId } = useParams();
  const {
    userData,
    doctors,
    currencySymbol,
    getDoctorData,
    token,
    backendURL,
  } = useContext(AppContext);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDocInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDoctorInfo(doctor);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]); // Clear previous slots

    // Getting current date
    let today = new Date();
    let allTimeSlots = []; // Collect all slots before setting state

    for (let i = 0; i < 7; i++) {
      // Getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Setting end time of the date with index to 9 PM (21:00)
      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // End time set to 9 PM

      // Setting hours for the current day
      if (i === 0 && today.getDate() === currentDate.getDate()) {
        // If today, adjust time based on the current hour
        let currentHour = currentDate.getHours();
        let currentMinutes = currentDate.getMinutes();

        // Set the hour to 10 AM if current time is before 10 AM
        currentDate.setHours(currentHour >= 10 ? currentHour + 1 : 10);
        currentDate.setMinutes(currentMinutes > 30 ? 30 : 0);
      } else {
        // For future days, set the time to 10:00 AM
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      // Generate time slots until the end time
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // Enable 12-hour format with AM/PM
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable =
          doctorInfo.slots_booked[slotDate] &&
          doctorInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // Increment the current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Add time slots for this day only if there are available slots
      if (timeSlots.length > 0) {
        allTimeSlots.push(timeSlots);
      }
    }

    // Set the state once with all the collected slots
    setDocSlots(allTimeSlots);
  };

  // book appointment function
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment.");
      navigate("/login");
      return;
    }

    const userId = userData._id;

    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      // Awaiting the axios post request
      const res = await axios.post(
        backendURL + "/user/book-appointment",
        { userId, docId, slotDate, slotTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        getDoctorData();
        navigate("/my-appointments");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to book an appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (doctorInfo) getAvailableSlots();
  }, [doctorInfo]);

  return (
    doctorInfo && (
      <section>
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={doctorInfo.image}
            alt="doctor img"
            className="bg-primary w-full sm:max-w-72 rounded-lg"
          />
          {/* doctor info: name, degree,experience etc */}
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {doctorInfo.name}
              <img
                src={assets.verified_icon}
                alt="verified_icon"
                className="w-5"
              />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {doctorInfo.degree} - {doctorInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {doctorInfo.experience}
              </button>
            </div>

            {/* doctor about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="info_icon" />
              </p>
              <p className="text-sm text-gray-500 mt-1 max-w-[700px]">
                {doctorInfo.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span>
                {currencySymbol}
                {doctorInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* booking slots */}
        {docSlots.length > 0 && (
          <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
            <p>Booking slots</p>
            <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
              {docSlots?.length &&
                docSlots?.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setSlotIndex(i)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      slotIndex === i
                        ? "bg-primary text-white"
                        : "border border-gray-200"
                    }`}
                  >
                    {item.length > 0 && (
                      <>
                        <p>{daysOfWeek[item[0].datetime.getDay()]}</p>
                        <p>{item[0].datetime.getDate()}</p>
                      </>
                    )}
                  </div>
                ))}
            </div>

            {/* booking slot time */}
            <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
              {docSlots.length &&
                docSlots[slotIndex].map((item, i) => (
                  <p
                    key={i}
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                      item.time === slotTime
                        ? "bg-primary text-white"
                        : "text-gray-400 border border-gray-300"
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))}
            </div>

            {/* book appointment btn */}
            <button
              onClick={bookAppointment}
              className={`bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 hover:bg-primary/90 duration-200 transition-all flex justify-center items-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="px-14 py-1">
                  <FaSpinner className="animate-spin mr-2" />
                </div>
              ) : (
                "Book an appointment"
              )}
            </button>
          </div>
        )}

        {/* listing related doctors */}
        <RelatedDoctors docId={docId} speciality={doctorInfo.speciality} />
      </section>
    )
  );
};

export default Appointment;
