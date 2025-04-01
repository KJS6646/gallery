import React, { useState } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
const Calendars = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div>
      <Calendar value={value} onChange={onChange} />
    </div>
  );
};

export default Calendars;
