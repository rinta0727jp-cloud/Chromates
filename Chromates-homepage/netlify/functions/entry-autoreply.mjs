export default {
  async formSubmitted(event) {

    // JOIN USフォーム以外は処理しない
    if (event.form?.name && event.form.name !== "entry") {
      return;
    }

    const name = event.data?.name;
    const email = event.data?.email;

    // メールアドレスが取得できなければ終了
    if (!email) {
      console.log("メールアドレスがありません");
      return;
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",

      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        from: "ChroMates <onboarding@resend.dev>",

        to: [email],

        subject: "【ChroMates】お問い合わせありがとうございます",

        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.8;">

            <h2>ChroMates</h2>

            <p>${name || "ご応募者"} 様</p>

            <p>
              ChroMatesへのお問い合わせありがとうございます。
            </p>

            <p>
              以下の内容でお問い合わせを受け付けました。<br>
              内容を確認後、担当者よりご連絡いたします。
            </p>

            <hr>

            <p>
              ChroMates<br>
              FUTSAL CIRCLE
            </p>

            <p>
              Instagram：@chromates2025
            </p>

            <hr>

            <small>
              ※このメールは自動送信されています。
            </small>

          </div>
        `
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend error:", error);
      return;
    }

    console.log("自動返信メールを送信しました:", email);
  }
};
