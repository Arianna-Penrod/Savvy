import { usePathname, router } from "expo-router";
import { ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

type AppLayoutProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

const navItems = [
  { label: "Home", href: "/landing" },
  { label: "My List", href: "/list" },
  { label: "Barcode", href: "/barcode" },
  { label: "Profile", href: "/profile" },
] as const;

export default function AppLayout({
  children,
  title,
  subtitle,
}: AppLayoutProps) {
  const pathname = usePathname();

  return (
    <View style={styles.page}>
      <View style={styles.navbar}>
        <View>
          <Text style={styles.logo}>Savvy</Text>
          <Text style={styles.tagline}>Shop smarter. Spend less.</Text>
        </View>

        <View style={styles.navLinks}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Pressable
                key={item.href}
                onPress={() => router.push(item.href)}
                style={isActive ? styles.activeNavButton : styles.navButton}
              >
                <Text style={isActive ? styles.activeNavText : styles.navText}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {(title || subtitle) && (
          <View style={styles.headerCard}>
            {title && <Text style={styles.pageTitle}>{title}</Text>}
            {subtitle && <Text style={styles.pageSubtitle}>{subtitle}</Text>}
          </View>
        )}

        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },
  navbar: {
    paddingTop: 52,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dbeafe",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  logo: {
    fontSize: 30,
    fontWeight: "900",
    color: "#1d4ed8",
  },
  tagline: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
    marginBottom: 16,
  },
  navLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  navButton: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  activeNavButton: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#2563eb",
    borderWidth: 1,
    borderColor: "#2563eb",
  },
  navText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1e3a8a",
  },
  activeNavText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#ffffff",
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e0f2fe",
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#0f172a",
  },
  pageSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#64748b",
    marginTop: 8,
  },
});