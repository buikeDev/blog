import React from "react";
import styles from "./about.module.css";
import Image from "next/image";

export default function AboutPage() {
  const authors = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Lead Writer & Editor",
      bio: "Sarah is a passionate storyteller with over 8 years of experience in digital content creation. She specializes in lifestyle and culture writing, bringing unique perspectives to everyday topics.",
      image: "/authors/sarah.jpg", // You can replace with actual author images
      social: {
        twitter: "@sarahjohnson",
        linkedin: "sarah-johnson-writer",
      },
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Technology & Innovation Writer",
      bio: "Michael is a tech enthusiast and former software engineer who loves exploring the intersection of technology and daily life. He writes about emerging trends and practical tech solutions.",
      image: "/authors/michael.jpg",
      social: {
        twitter: "@michaelchen",
        linkedin: "michael-chen-tech",
      },
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Food & Travel Contributor",
      bio: "Emma is a culinary expert and travel blogger who shares her adventures through food and culture. Her writing captures the essence of places through their unique flavors and traditions.",
      image: "/authors/emma.jpg",
      social: {
        twitter: "@emmarodriguez",
        linkedin: "emma-rodriguez-food",
      },
    },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About Our Blog</h1>
          <p className={styles.heroSubtitle}>
            Sharing stories, insights, and perspectives that matter
          </p>
        </div>
      </div>

      {/* Blog Explanation Section */}
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <div className={styles.blogSection}>
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <div className={styles.blogContent}>
              <div className={styles.blogText}>
                <p>
                  Welcome to our blog, a digital space where we explore the
                  world through thoughtful writing, compelling stories, and
                  meaningful conversations. Founded in 2023, we've created a
                  platform that celebrates diverse perspectives and fosters
                  community through shared experiences.
                </p>
                <p>
                  Our mission is simple: to inspire, inform, and connect.
                  Whether you're looking for practical advice, cultural
                  insights, or simply a good read, we're here to provide content
                  that resonates with your interests and enriches your daily
                  life.
                </p>
                <p>
                  We believe in the power of storytelling to bridge gaps,
                  challenge perspectives, and create understanding. Every
                  article we publish is crafted with care, researched
                  thoroughly, and written with our readers in mind.
                </p>
              </div>
              <div className={styles.blogStats}>
                <div className={styles.stat}>
                  <h3>500+</h3>
                  <p>Articles Published</p>
                </div>
                <div className={styles.stat}>
                  <h3>50K+</h3>
                  <p>Monthly Readers</p>
                </div>
                <div className={styles.stat}>
                  <h3>15+</h3>
                  <p>Expert Contributors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authors Section */}
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <p className={styles.sectionSubtitle}>
            The passionate writers and creators behind our content
          </p>

          <div className={styles.authorsGrid}>
            {authors.map((author) => (
              <div key={author.id} className={styles.authorCard}>
                <div className={styles.authorImageContainer}>
                  <Image
                    src={author.image}
                    alt={author.name}
                    width={200}
                    height={200}
                    className={styles.authorImage}
                  />
                </div>
                <div className={styles.authorInfo}>
                  <h3 className={styles.authorName}>{author.name}</h3>
                  <p className={styles.authorRole}>{author.role}</p>
                  <p className={styles.authorBio}>{author.bio}</p>
                  <div className={styles.authorSocial}>
                    <a
                      href={`https://twitter.com/${author.social.twitter}`}
                      className={styles.socialLink}
                    >
                      Twitter
                    </a>
                    <a
                      href={`https://linkedin.com/in/${author.social.linkedin}`}
                      className={styles.socialLink}
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <div className={styles.contactSection}>
            <h2 className={styles.sectionTitle}>Get in Touch</h2>
            <p className={styles.contactText}>
              Have a story idea? Want to collaborate? We'd love to hear from
              you!
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <h4>Email</h4>
                <p>hello@ourblog.com</p>
              </div>
              <div className={styles.contactItem}>
                <h4>Follow Us</h4>
                <p>@ourblog on social media</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
