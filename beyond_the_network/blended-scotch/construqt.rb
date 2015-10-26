require_relative "../core_net"

require_relative "../access-point/distil_wifi_ap.rb"

def distil_blended_scotch(cn)
  [300,301].each do |vlan|
    cn.region.hosts.add("blended-scotch-#{vlan}", "flavour" => "ubuntu",
                        "mother" => cn.vagrant_host, "vagrant_deploy" => []) do |host|
      cn.region.interfaces.add_device(host, "lo", "mtu" => "9000", "address" =>
        cn.region.network.addresses.add_ip(Construqt::Addresses::LOOOPBACK))
      host.configip = host.id ||= Construqt::HostId.create do |my|
        my.interfaces << cn.region.interfaces.add_device(host, "eth0", "mtu" => 1500,
         "plug_in" => Construqt::Cables::Plugin.new.iface(cn.mac_wlan),
         "address" => cn.network.addresses.add_ip(Construqt::Addresses::DHCPV4))
      end
      cn.region.interfaces.add_vlan(host, "eth1.#{vlan}", "mtu" => 1500, "vlan_id" => vlan,
          "interface" => cn.region.interfaces.add_device(host, "eth1", "mtu" => 1500,
            "plug_in" => Construqt::Cables::Plugin.new.iface(cn.mac_usb_ether)),
          'address' => cn.region.network.addresses.add_ip("192.168.#{vlan%256}.1/24#INTERNAL-NET",
          "dhcp_range" => ["192.168.#{vlan%256}.100", "192.168.#{vlan%256}.200"]))
    end
  end
end

core_net = CoreNet.setup

distil_wifi_ap(core_net)
distil_blended_scotch(core_net)

core_net.region.cables.add(
  core_net.region.interfaces.find("wifi-ap", "ether2"),
  core_net.region.interfaces.find("vagrant-host", "en3")
)

core_net.produce

