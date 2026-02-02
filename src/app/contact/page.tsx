"use client";
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

const socialLinks = [
  { icon: Github, href: siteConfig.links.github, label: 'GitHub', username: '@yourusername' },
  { icon: Linkedin, href: siteConfig.links.linkedin, label: 'LinkedIn', username: 'yourusername' },
  { icon: Twitter, href: siteConfig.links.twitter, label: 'Twitter', username: '@yourusername' },
  { icon: Mail, href: `mailto:${siteConfig.links.email}`, label: 'Email', username: siteConfig.links.email },
];

export default function ContactPage() {
  // Contact form removed per request — leaving social links and contact cards.

  return (
    <div className="py-20">
      <Container size="md">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Info (form removed) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  The contact form has been removed. Please reach out via the links on the right or email me directly.
                </p>
                <div className="mt-4">
                  <a
                    href={`mailto:${siteConfig.links.email}`}
                    className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
                  >
                    Email me
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Connect with me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialLinks.map(({ icon: Icon, href, label, username }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                        <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">{label}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">{username}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  I typically respond to messages within 24-48 hours during business days.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
