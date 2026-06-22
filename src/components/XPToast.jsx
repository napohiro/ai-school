export default function XPToast({ amount }) {
  if (!amount) return null;
  return (
    <div className="xp-toast">
      ✨ +{amount} XP ゲット！
    </div>
  );
}
