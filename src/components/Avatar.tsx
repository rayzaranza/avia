interface AvatarProps {
  image: string;
}

export function Avatar({ image }: AvatarProps) {
  return <img src={image} className="size-small rounded-full object-cover" />;
}
