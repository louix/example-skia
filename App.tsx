import * as skia from "@shopify/react-native-skia"; // 0.1.163
import * as reanimated from "react-native-reanimated"; // 2.12.0

export const App = (): JSX.Element => {
  const cursorActive = reanimated.useSharedValue(false);
  setInterval(() => {
    cursorActive.value = !cursorActive.value;
  }, 1000);
  return (
    <skia.Canvas style={{ flex: 1 }}>
      <skia.Rect rect={{ x: 0, y: 0, width: 200, height: 100 }} color="yellow" />
      <CursorSkia cursorActive={cursorActive} />
    </skia.Canvas>
  );
};

export default App;

const CursorSkia = ({
  cursorActive,
}: {
  cursorActive: reanimated.SharedValue<boolean>;
}): JSX.Element | null => {
  const opacity = skia.useValue(1);

  skia.useSharedValueEffect(() => {
    skia.runTiming(opacity, cursorActive.value ? 1 : 0, { duration: 500 });
  }, cursorActive);

  return (
    <skia.Line
      opacity={opacity}
      p1={{ x: 100, y: 0 }}
      p2={{ x: 100, y: 100 }}
      color="red"
      strokeWidth={2}
    />
  );
};