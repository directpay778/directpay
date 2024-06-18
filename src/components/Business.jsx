import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";
import ButtonTwo from "./ButtonTwo";

const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Business = () =>  (
  <section id="about" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        You do the business, <br className="sm:block hidden" /> we’ll handle
        the money.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        <strong>Address:</strong> Office no. 217 2nd floor, jain tower 1, District Center, Janakpuri, New Delhi 110058
      </p>
      <p className={`${styles.paragraph} max-w-[470px] mt-2`}>
        <strong>Timing:</strong> Monday to Saturday: 10 AM - 6 PM (Closed on govt. holiday)
      </p>
      <p className={`${styles.paragraph} max-w-[470px] mt-2`}>
        <strong>Phone:</strong> 011-49054121
      </p>

       
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        DirectPay is the Product of JSR group. which deals in all types of loan, With the right loan provider, you can improve your financial life by
        taking loan with easy process. So do not wait just come to us and get your loan in just few days.
      </p>

      <ButtonTwo styles={`mt-10`} 
      
      
      />
    </div>

    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Business;
