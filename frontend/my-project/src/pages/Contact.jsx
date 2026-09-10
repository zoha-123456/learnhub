import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/contacts';

const initialForm = { name: '', email: '', subject: '', message: '' };

function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [messages, setMessages] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error('Could not load messages:', err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to send message');
      const newMessage = await response.json();
      setMessages([newMessage, ...messages]);
      setSuccess('✅ Message sent! We will get back to you soon.');
      setFormData(initialForm);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="section container">
      <div className="section-title">
        <h2>Contact Us</h2>
        <p>Have a question? Send us a message.</p>
      </div>

      <div className="form-box" style={{ marginBottom: 50 }}>
        {success && <p className="success-msg">{success}</p>}
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
            </div>
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Your message"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>

      <div className="section-title">
        <h2>Submitted Messages</h2>
      </div>
      {loading && <p>Loading messages...</p>}
      {!loading && messages.length === 0 && <p>No messages yet.</p>}
      {!loading &&
        messages.map((msg) => (
          <div className="contact-list-item" key={msg._id}>
            <div>
              <strong>{msg.subject}</strong>
              <p>{msg.message}</p>
              <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                From {msg.name} ({msg.email})
              </p>
            </div>
          </div>
        ))}
    </section>
  );
}

export default Contact;
