import React from "react";
import Svg, {
  Rect,
  Path,
  Circle,
  G,
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";

export const TdsHeroIllustration: React.FC = () => {
  return (
    <Svg width={135} height={135} viewBox="0 0 135 135" fill="none">
      <Defs>
        <LinearGradient id="walletGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FB923C" />
          <Stop offset="100%" stopColor="#EA580C" />
        </LinearGradient>
        <LinearGradient id="coinGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FCD34D" />
          <Stop offset="100%" stopColor="#F59E0B" />
        </LinearGradient>
        <LinearGradient id="rupeeCircleGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#60A5FA" />
          <Stop offset="100%" stopColor="#2563EB" />
        </LinearGradient>
      </Defs>

      {/* Sparkles */}
      <Path d="M115 15L116 19L120 20L116 21L115 25L114 21L110 20L114 19Z" fill="#FBBF24" />
      <Path d="M12 35L13 38L16 39L13 40L12 43L11 40L8 39L11 38Z" fill="#FBBF24" />
      <Circle cx={124} cy={60} r={2} fill="#FBBF24" />

      {/* Background Document Paper */}
      <G transform="rotate(4, 75, 45)">
        <Rect
          x={35}
          y={10}
          width={76}
          height={96}
          rx={8}
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth={1.5}
        />
        {/* Header banner on document */}
        <SvgText
          x={43}
          y={26}
          fontSize={6.5}
          fontWeight="800"
          fill="#0B1F3A"
          letterSpacing={0.4}
        >
          TDS REFUND
        </SvgText>

        {/* Checkmark 1 */}
        <Circle cx={44} cy={38} r={4} fill="#DCFCE7" />
        <Path d="M42 38L43.5 39.5L46 36.5" stroke="#16A34A" strokeWidth={1.2} strokeLinecap="round" />
        <Rect x={52} y={36.5} width={48} height={3.5} rx={1.75} fill="#E2E8F0" />

        {/* Checkmark 2 */}
        <Circle cx={44} cy={50} r={4} fill="#DCFCE7" />
        <Path d="M42 50L43.5 51.5L46 48.5" stroke="#16A34A" strokeWidth={1.2} strokeLinecap="round" />
        <Rect x={52} y={48.5} width={42} height={3.5} rx={1.75} fill="#E2E8F0" />

        {/* Line 3 */}
        <Rect x={42} y={62} width={58} height={3.5} rx={1.75} fill="#F1F5F9" />
        <Rect x={42} y={70} width={50} height={3.5} rx={1.75} fill="#F1F5F9" />
      </G>

      {/* Rupee Blue Coin */}
      <G>
        <Circle cx={28} cy={52} r={17} fill="url(#rupeeCircleGrad)" />
        <Circle cx={28} cy={52} r={14.5} stroke="#93C5FD" strokeWidth={1.2} />
        <SvgText
          x={23}
          y={58}
          fontSize={17}
          fontWeight="bold"
          fill="#FFFFFF"
        >
          ₹
        </SvgText>
      </G>

      {/* Cash protruding from wallet */}
      <Rect
        x={68}
        y={54}
        width={34}
        height={22}
        rx={3}
        fill="#86EFAC"
        stroke="#4ADE80"
        strokeWidth={1}
        transform="rotate(-12, 68, 54)"
      />

      {/* Leather Orange Wallet */}
      <Rect
        x={58}
        y={66}
        width={58}
        height={40}
        rx={8}
        fill="url(#walletGrad)"
      />
      {/* Wallet flap & clasp */}
      <Path
        d="M58 74H116V78C116 82 112 84 108 84H66C62 84 58 82 58 78V74Z"
        fill="#C2410C"
        opacity={0.3}
      />
      <Circle cx={106} cy={86} r={4.5} fill="#FED7AA" />
      <Circle cx={106} cy={86} r={2.5} fill="#FFFFFF" />

      {/* Golden Coins Stack at Base */}
      {/* Coin 1 */}
      <G transform="translate(38, 92)">
        <Rect x={0} y={6} width={26} height={6} rx={3} fill="#D97706" />
        <Rect x={0} y={0} width={26} height={6} rx={3} fill="url(#coinGrad)" />
      </G>
      {/* Coin 2 */}
      <G transform="translate(38, 98)">
        <Rect x={0} y={6} width={26} height={6} rx={3} fill="#D97706" />
        <Rect x={0} y={0} width={26} height={6} rx={3} fill="url(#coinGrad)" />
      </G>
      {/* Coin 3 */}
      <G transform="translate(38, 104)">
        <Rect x={0} y={6} width={26} height={6} rx={3} fill="#D97706" />
        <Rect x={0} y={0} width={26} height={6} rx={3} fill="url(#coinGrad)" />
      </G>
    </Svg>
  );
};
