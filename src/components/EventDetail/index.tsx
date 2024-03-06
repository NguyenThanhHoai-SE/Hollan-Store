import { useEffect, useRef } from "react";
import { useMainLayoutContext } from "../common/Head/MainLayoutContext";
export function EventDetail() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const {setIsLoading} = useMainLayoutContext();

  useEffect(() => {
    setIsLoading(true);
  }, [setIsLoading])
  const url =
    "https://nguyenthanhhoai-se.github.io/hollan_store/productIframe.html";

  return (
    <div>
      <iframe
        id="userDefinedExhibitionFrame"
        key={`/api/htmlRenderer?url=${encodeURIComponent(url as string)}`}
        name="userDefinedExhibitionFrame"
        src={`/api/htmlRenderer?url=${encodeURIComponent(url as string)}`}
        style={{
          maxWidth: "100vw",
          minWidth: "1024px",
          width: "100%",
          height: "1024px",
          overflow: "hidden",
        }}
        title="preview"
        ref={iframeRef}
        onLoad={() => {
          try {
            //code any thing
          } finally {
            setTimeout(() => {
              if (iframeRef.current) {
                iframeRef.current.style.height = `${
                  ( iframeRef.current.contentWindow?.document?.body?.offsetHeight || 0) + 80
                }px`;
              }
              setIsLoading(false);
            }, 350);
          }
        }}
      />
    </div>
  );
}
