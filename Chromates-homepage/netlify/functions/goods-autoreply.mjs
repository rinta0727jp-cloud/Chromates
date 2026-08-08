export default {
  async formSubmitted(event) {

    // グッズ予約フォーム以外は処理しない
    if (event.form?.name && event.form.name !== "goods-reservation") {
      return;
    }

    const name = event.data?.name;
    const email = event.data?.email;
    const product = event.data?.product;
    const quantity = event.data?.quantity;
    const size = event.data?.size;
    const note = event.data?.note;

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

        subject: "【ChroMates】グッズのご予約ありがとうございます",

        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #222;">

            <h2 style="color: #789537;">
              ChroMates
            </h2>

            <p>
              ${name || "ご予約者"} 様
            </p>

            <p>
              ChroMatesオフィシャルグッズをご予約いただき、
              ありがとうございます。
            </p>

            <p>
              以下の内容で予約を受け付けました。
            </p>

            <div style="
              margin: 25px 0;
              padding: 20px;
              background: #f4f6f0;
              border-left: 4px solid #789537;
            ">

              <p>
                <strong>商品</strong><br>
                ${product || "-"}
              </p>

              <p>
                <strong>数量</strong><br>
                ${quantity || "-"}
              </p>

              <p>
                <strong>サイズ</strong><br>
                ${size || "指定なし"}
              </p>

              ${
                note
                  ? `
                    <p>
                      <strong>備考</strong><br>
                      ${note}
                    </p>
                  `
                  : ""
              }

            </div>

            <p>
              予約内容を確認後、
              支払い方法や受け渡し方法についてご連絡いたします。
            </p>

            <hr style="margin: 30px 0; border: 0; border-top: 1px solid #ddd;">

            <p>
              ChroMates<br>
              FUTSAL CIRCLE
            </p>

            <p>
              Instagram：@chromates2025
            </p>

            <small style="color: #888;">
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

    console.log("グッズ予約の自動返信を送信しました:", email);
  }
};
