import { TwitterPicker, ColorResult } from "react-color";

interface ColorPickerProps {
  defaultColor: string;
  secondDefaultColor?: string;
  setColor?: (color: any) => void;
  setColor_second?: (color: any) => void;
  saveColor?: (color: any) => void;
  styles_pin?: string;
  styles_div?: string;
  resetColor?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  defaultColor,
  secondDefaultColor,
  setColor,
  setColor_second,
  saveColor,
  styles_pin,
  styles_div,
  resetColor,
}) => {
  return (
    <div
      className={` hidden xs:flex justify-end ${styles_pin} cursor-pointer group`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9"
        />
      </svg>

      <div
        className={`  hidden  pt-4 group-hover:block text-white ${styles_div}`}
      >
        <div className="relative">
          <span
            className={`b w-7 cursor-pointer h-7 rounded-md absolute -top-2 hover:-top-5 right-4 transition-all duration-500 ease-in-out`}
            title="Reset to Default color"
            style={{ backgroundColor: resetColor }}
            onClick={() => {
              setColor?.(defaultColor);

              setColor_second?.(secondDefaultColor);
            }}
          ></span>

          <TwitterPicker onChangeComplete={saveColor} className="bg-red-900" />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
