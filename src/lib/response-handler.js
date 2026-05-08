class ResponseHandler {
  static created(res, data, message) {
    return res.status(201).json({ message, data });
  }

  static ok(res, data, message) {
    return res.status(200).json({ message, data });
  }

  static auth(res, data, message) {
    const cookieOptions = {
      expires: new Date(Date.now() + 15 * 60 * 1000),
      maxAge: 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    };

    return res
      .cookie("accessToken", data?.accessToken, cookieOptions)
      .json({ message, refreshToken: data?.refreshToken });
  }
}

module.exports = { ResponseHandler };
