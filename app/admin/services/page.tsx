"use client"

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <p className="text-muted-foreground mt-2">Manage your services offerings</p>
      </div>

      {/* Coming soon placeholder */}
      <div className="rounded-lg border border-dashed border-border p-12 text-center">
        <p className="text-muted-foreground">Services management coming soon</p>
      </div>
    </div>
  )
}
