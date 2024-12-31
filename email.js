const nodemailer = require('nodemailer');

// 配置邮件服务
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'waixingwenming@outlook.com',
        pass: '你的邮箱密码',
    },
});

// 发送邮件
transporter.sendMail({
    from: '你的邮箱@gmail.com',
    to: '接收通知的邮箱@example.com',
    subject: '用户提交的新信息',
    text: `用户提交的信息：${userInput}`,
}, (err, info) => {
    if (err) {
        console.error('邮件发送失败:', err);
    } else {
        console.log('邮件发送成功:', info.response);
    }
});
