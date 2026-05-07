"use client";
import { motion } from "framer-motion";

const vendors = [
  { name: "Cisco",       category: "Networking"       },
  { name: "HP Enterprise",category: "Servers"         },
  { name: "Dell",        category: "Infrastructure"   },
  { name: "IBM / Lenovo",category: "Servers"          },
  { name: "Microsoft",   category: "Licensing · Cloud"},
  { name: "Fortinet",    category: "Security"         },
  { name: "Oracle",      category: "Database"         },
  { name: "Adobe",       category: "Licensing"        },
  { name: "VMware",      category: "Virtualization"   },
  { name: "AWS",         category: "Cloud"            },
  { name: "Symantec",    category: "Security"         },
  { name: "McAfee",      category: "Security"         },
];

export function TechStack() {
  return (
    <section className="bg-[var(--bg-card)] py-24 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-xs font-semibold text-[var(--text-3)] uppercase tracking-widest mb-4">Technology Partners</p>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--text-1)] tracking-tight mb-3">
            Built on the world&apos;s top platforms.
          </h2>
          <p className="text-[var(--text-2)] max-w-lg mx-auto">
            We deploy, configure, and manage solutions from the vendors your business already trusts.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {vendors.map(({ name, category }, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="group flex flex-col items-center justify-center p-4 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border)] hover:border-violet-500/30 hover:shadow-md transition-all duration-200 cursor-default">
              <span className="text-sm font-bold text-[var(--text-1)] group-hover:brand-gradient transition-colors mb-1 text-center leading-tight">{name}</span>
              <span className="text-[10px] text-[var(--text-3)] text-center font-medium">{category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
