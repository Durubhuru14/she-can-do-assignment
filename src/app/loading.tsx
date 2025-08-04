import { Spinner } from "@/components/ui/spinner";

export default function loading() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <Spinner size={"large"}/>
    </div>
  );
}
