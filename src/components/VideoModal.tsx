import { X } from "lucide-react";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  videoId: string;
}

export default function VideoModal({ open, onClose, videoId }: VideoModalProps) {
  if (!open) return null;
  return (
    <div
      className="modal-fade fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4"
      onClick={onClose}
    >
      <div
        className="modal-pop relative aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 transition hover:text-white"
          aria-label="Close video"
        >
          <X size={28} />
        </button>
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Indus Solar Solutions"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
