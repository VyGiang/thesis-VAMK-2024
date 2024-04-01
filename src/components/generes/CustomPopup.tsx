import React, { useEffect, useState, FC, useRef } from "react"
import popupStyles from "./custom-popup.module.css"

interface CustomPopupProps {
  title: string
  show: boolean
  onClose: () => void // No need to pass a boolean since it's always closing
  children: React.ReactNode
}

const CustomPopup: FC<CustomPopupProps> = ({
  title,
  show,
  onClose,
  children,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const popupRef = useRef<HTMLDivElement>(null) // Ref for the popup content

  useEffect(() => {
    setIsVisible(show)
  }, [show])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose() // Call the onClose prop when click is outside
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <div
      className={`${popupStyles.overlay} ${isVisible ? popupStyles.show : ""}`}
      style={{
        visibility: isVisible ? "visible" : "hidden",
        opacity: isVisible ? "1" : "0",
      }}
    >
      <div className={popupStyles.popup} ref={popupRef}>
        <h2>{title}</h2>
        <span className={popupStyles.close} onClick={onClose}>
          &times;
        </span>
        <div className={popupStyles.content}>{children}</div>
      </div>
    </div>
  )
}

export default CustomPopup
