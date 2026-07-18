import { ArrowLeftIcon, VideoIcon } from "lucide-react";
import { Link } from "react-router";
import { OrderVideoSkeleton } from "../components/LoadingSkeletons.jsx";
import { PageError } from "../components/PageError.jsx";
import { useOutletContext } from "react-router";
import { useOrderDetailPage } from "../hooks/useOrderDetailPage.js";

function OrderVideoPage() {
  const { paid } = useOutletContext();
  const { order, error, loading } = useOrderDetailPage();

  if (loading) {
    return <OrderVideoSkeleton />;
  }

  if (error || !order) {
    return (
      <PageError
        message="Order not found or you don't have access."
        action={{ to: "/orders", label: "Back to orders" }}
      />
    );
  }

  if (!paid) {
    return (
      <div role="alert" className="alert alert-info">
        <span>This order must be paid before you can join video support.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left">
      <Link
        to={`/orders/${order.id}/chat`}
        className="btn btn-ghost btn-sm gap-2 text-base-content/80"
      >
        <ArrowLeftIcon className="size-4" aria-hidden />
        Back to support chat
      </Link>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body flex-row items-start gap-4">
          <div className="avatar placeholder">
            <div className="w-12 rounded-box bg-secondary/20 text-secondary flex items-center justify-center">
              <VideoIcon className="size-6" aria-hidden />
            </div>
          </div>
          <div>
            <h1 className="card-title text-lg">Video call</h1>
            <p className="text-sm text-base-content/70">
              Support can send a video call link in the chat. Open the support
              chat tab to join.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderVideoPage;
