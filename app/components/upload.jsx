import { Button } from "@/components/ui/button";
import { createContext, useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function UploadButton({ uwConfig, setPublicId, title }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.public_id);
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <Button
        variant="secondary"
        size="sm"
        id="upload_widget"
        onClick={initializeCloudinaryWidget}
        className="flex flex-row justify-between border-2 border-foreground px-5 gap-2"
      >
        <FaArrowUp/> 
        <span>{title}</span>
      </Button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadButton;
export { CloudinaryScriptContext };
