import { useEffect, useRef } from "react";

/**
 * Хук позволяет сохранить предыдущее состояние после обновления
 */
const usePrevState = <T>(data: T) => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = data;
  }, [data]);

  return ref.current;
};

export default usePrevState;
