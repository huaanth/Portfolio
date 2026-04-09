import imgImage1 from "./f93e7825f2780720cdd98d5b30cb674cf353e960.png";
import imgImage2 from "./dbda7126745f8532e19b46c98bf00146b3d9cee8.png";
import imgImage5 from "./4a7896e17bf3c58d9e56b2190996bbc2c026b44e.png";
import imgImage6 from "./7914ecdeb204281078ab4574e32f698144167a51.png";
import imgImage7 from "./621af008d7f06d30a880dac852fe346d00fd6e47.png";

function Dots() {
  return (
    <div className="absolute content-stretch flex gap-[13.483px] inset-[3.64%_89.84%_93.57%_2.42%] items-start" data-name="Dots">
      <div className="relative shrink-0 size-[23px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
          <circle cx="11.5" cy="11.5" fill="var(--fill-0, #F45952)" id="Ellipse 2" r="11.5" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[23px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
          <circle cx="11.5" cy="11.5" fill="var(--fill-0, #FFBC00)" id="Ellipse 3" r="11.5" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[23px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
          <circle cx="11.5" cy="11.5" fill="var(--fill-0, #0CD651)" id="Ellipse 1" r="11.5" />
        </svg>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute h-[824px] left-0 top-0 w-[1240px]" data-name="Mockup / Light">
        <div className="absolute bg-[#f1f1f1] inset-0 rounded-[40px] shadow-[0px_16px_24px_0px_rgba(0,0,0,0.1),0px_2px_6px_0px_rgba(0,0,0,0.1),10px_0px_1px_0px_rgba(0,0,0,0.04)]" data-name="Page" />
        <div className="absolute bg-white inset-[3.03%_45.48%_93.08%_13.71%] rounded-[8px]" data-name="URL" />
        <Dots />
      </div>
      <div className="absolute h-[502px] left-[72px] top-[184px] w-[284px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <p className="absolute font-['Judson:Regular',sans-serif] h-[57px] leading-[normal] left-[72px] not-italic text-[50px] text-black top-[103px] w-[284px]">Hi, I’m anthony</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[49px] leading-[normal] left-[452px] not-italic text-[25px] text-black top-[103px] w-[304px]">About me</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[37px] leading-[normal] left-[804px] not-italic text-[25px] text-black top-[213px] w-[228px]">Projects</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[56px] leading-[normal] left-[481px] not-italic text-[25px] text-black top-[507px] w-[125px]">Resume</p>
      <div className="absolute left-[396px] size-[358px] top-[120px]" data-name="image 2">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgImage2} />
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[131.81%] left-[-6.93%] max-w-none top-[198.11%] w-[159.88%]" src={imgImage2} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative size-full">
      <Group />
      <div className="absolute left-[691px] size-[358px] top-[250px]" data-name="image 3">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
      <div className="absolute left-[398px] size-[358px] top-[507px]" data-name="image 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
      <div className="absolute left-[425px] size-[192px] top-[203px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage5} />
      </div>
      <div className="absolute left-[726px] size-[192px] top-[333px]" data-name="image 6">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage6} />
      </div>
      <div className="absolute h-[195px] left-[446px] top-[588px] w-[150px]" data-name="image 7">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
      </div>
    </div>
  );
}