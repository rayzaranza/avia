interface AvatarProps {
  image: string;
}

export function Avatar({ image }: AvatarProps) {
  return (
    <img
      src={image}
      className="size-small shrink-0 rounded-full object-cover"
    />
  );
}
