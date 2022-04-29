export const me = (req, res) => {
  res.status(200).json({ data: req.user })
}

export const content = (req, res) => {
  res.status(200).json(req.body)
}
