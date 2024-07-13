import classes from './gray-bakcground.module.css'

export default function GrayBackground({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={classes.wrapper}>{children}</div>
}
